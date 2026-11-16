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
  type NavLink,
} from "@/lib/navigation"
import { cn } from "@/lib/utils"

const DESKTOP_QUERY = "(min-width: 1024px)"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/80">
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
  "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-foreground/75 transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:text-foreground"

function DesktopNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden lg:flex" aria-label="Main">
      <NavigationMenuList className="gap-0.5">
        {mainNav.map((item) => {
          const active = isActivePath(pathname, item.href)

          if (item.children) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger
                  data-active={active || undefined}
                  className="h-9 bg-transparent px-3 text-foreground/75 hover:text-foreground data-[active=true]:text-foreground data-open:text-foreground"
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <DropdownPanel
                    links={item.children}
                    overview={{ title: `All ${item.title.toLowerCase()}`, href: item.href }}
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
                className={cn(topLinkClass, "p-0 px-3 hover:bg-muted")}
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

function DropdownPanel({
  links,
  overview,
  pathname,
}: {
  links: NavLink[]
  overview: NavLink
  pathname: string
}) {
  return (
    <div className="w-[22rem]">
      <ul className="grid gap-0.5">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href)
          return (
            <li key={link.href}>
              <NavigationMenuLink
                asChild
                active={active}
                className="flex-col items-start gap-0.5 px-3 py-2.5"
              >
                <Link href={link.href} aria-current={active ? "page" : undefined}>
                  <span className="text-sm font-medium text-foreground">
                    {link.title}
                  </span>
                  {link.description && (
                    <span className="text-[0.8125rem] leading-snug text-muted-foreground">
                      {link.description}
                    </span>
                  )}
                </Link>
              </NavigationMenuLink>
            </li>
          )
        })}
      </ul>
      <div className="mt-1 border-t pt-1">
        <NavigationMenuLink
          asChild
          className="justify-between px-3 py-2 text-sm font-medium text-brand hover:text-brand"
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
                  {item.children && (
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
