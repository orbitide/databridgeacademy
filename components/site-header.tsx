"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  authLinks,
  isActivePath,
  mainNav,
  type NavGroup,
  type NavLink,
} from "@/lib/navigation"
import { cn } from "@/lib/utils"

const DESKTOP_QUERY = "(min-width: 1024px)"

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/80"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <DesktopNav />
        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="hidden h-9 px-3.5 lg:inline-flex"
          >
            <Link href={authLinks.login.href}>{authLinks.login.title}</Link>
          </Button>
          <Button asChild className="hidden h-9 px-4 sm:inline-flex">
            <Link href={authLinks.apply.href}>{authLinks.apply.title}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/* Desktop                                                                    */
/* -------------------------------------------------------------------------- */

const topLinkClass =
  "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-foreground/75 transition-colors outline-none hover:bg-background hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:bg-background data-[active=true]:text-foreground"

function DesktopNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden lg:flex" aria-label="Main">
      <NavigationMenuList className="gap-0.5 rounded-lg bg-muted p-1">
        {mainNav.map((item) => {
          const active = isActivePath(pathname, item.href)

          if (item.children || item.groups) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger
                  data-active={active || undefined}
                  className="h-9 bg-transparent px-3 text-foreground/75 hover:bg-background hover:text-foreground focus:bg-background data-[active=true]:bg-background data-[active=true]:text-foreground data-open:bg-background data-open:text-foreground data-open:hover:bg-background data-open:focus:bg-background data-popup-open:bg-background data-popup-open:hover:bg-background"
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <DropdownPanel
                    links={item.children ?? []}
                    groups={item.groups}
                    overview={{
                      title: item.overviewLabel ?? `All ${item.title.toLowerCase()}`,
                      href: item.href,
                    }}
                    pathname={pathname}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                asChild
                active={active}
                className={cn(topLinkClass, "p-0 px-3")}
              >
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-sm bg-secondary px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </span>
  )
}

function MenuLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const active = isActivePath(pathname, link.href)
  return (
    <li>
      <NavigationMenuLink
        asChild
        active={active}
        className="justify-between gap-3 px-3 py-1.5"
      >
        <Link href={link.href} aria-current={active ? "page" : undefined}>
          <span className="text-base font-medium text-foreground">
            {link.title}
          </span>
          {link.badge && <ComingSoon>{link.badge}</ComingSoon>}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function DropdownPanel({
  links,
  groups,
  overview,
  pathname,
}: {
  links: NavLink[]
  groups?: NavGroup[]
  overview: NavLink
  pathname: string
}) {
  return (
    <div className={groups ? "w-[42rem]" : "w-[20rem]"}>
      {groups ? (
        <div className="grid grid-cols-2 gap-3">
          {groups.map((group) => (
            <section key={group.label} aria-label={group.label}>
              <div className="px-3 pt-1 pb-0.5">
                <p className="text-sm font-semibold tracking-wide text-brand uppercase">
                  {group.label}
                </p>
              </div>
              <ul className="grid gap-0.5">
                {group.links.map((link) => (
                  <MenuLink key={link.href} link={link} pathname={pathname} />
                ))}
              </ul>
              {group.footer && (
                <div className="mt-0.5 px-0">
                  <NavigationMenuLink
                    asChild
                    className="justify-between gap-3 px-3 py-1.5 text-sm font-medium text-brand hover:text-brand"
                  >
                    <Link href={group.footer.href}>
                      {group.footer.title}
                      <ArrowRight className="size-4" />
                    </Link>
                  </NavigationMenuLink>
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-0.5">
          {links.map((link) => (
            <MenuLink key={link.href} link={link} pathname={pathname} />
          ))}
        </ul>
      )}
      <div className="mt-1 border-t pt-1">
        <NavigationMenuLink
          asChild
          className="justify-between px-3 py-2 text-base font-medium text-brand hover:text-brand"
        >
          <Link href={overview.href}>
            {overview.title}
            <ArrowRight className="size-4" />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Mobile                                                                     */
/* -------------------------------------------------------------------------- */

function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const close = React.useCallback(() => setOpen(false), [])

  // Close the sheet if the viewport grows into the desktop layout.
  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-nav"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        id="mobile-nav"
        side="right"
        className="w-full gap-0 bg-background p-0 sm:max-w-sm"
      >
        <SheetHeader className="h-16 justify-center border-b px-4 sm:px-6">
          <SheetTitle className="sr-only">Main menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate Data Bridge Academy
          </SheetDescription>
          <BrandLogo onClick={close} className="self-start" />
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <li key={item.title} className="border-b border-border/70 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md py-3 text-base font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      active ? "text-foreground" : "text-foreground/80"
                    )}
                  >
                    {item.title}
                    {active && (
                      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                    )}
                  </Link>
                  {item.groups ? (
                    <div className="mb-3 ml-1 flex flex-col gap-3 border-l pl-3">
                      {item.groups.map((group) => (
                        <div key={group.label}>
                          <p className="pt-1 text-xs font-semibold tracking-wide text-brand uppercase">
                            {group.label}
                          </p>
                          <ul className="mt-1 flex flex-col">
                            {group.links.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={close}
                                  className="flex items-center justify-between gap-3 rounded-md py-2 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                                >
                                  {child.title}
                                  {child.badge && (
                                    <ComingSoon>{child.badge}</ComingSoon>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {group.footer && (
                            <Link
                              href={group.footer.href}
                              onClick={close}
                              className="mt-1 flex items-center gap-1.5 rounded-md py-2 text-sm font-medium text-brand outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                            >
                              {group.footer.title}
                              <ArrowRight className="size-4" />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    item.children && (
                      <ul className="mb-3 ml-1 flex flex-col border-l pl-3">
                        {item.children.map((child) => {
                          const childActive = isActivePath(pathname, child.href)
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={close}
                                aria-current={childActive ? "page" : undefined}
                                className={cn(
                                  "block rounded-md py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                  childActive
                                    ? "font-medium text-brand"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {child.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="grid gap-2 border-t p-4 sm:px-6">
          <Button asChild size="lg" className="h-11">
            <Link href={authLinks.apply.href} onClick={close}>
              {authLinks.apply.title}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11">
            <Link href={authLinks.login.href} onClick={close}>
              {authLinks.login.title}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
