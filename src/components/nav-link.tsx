import { cn } from "@/lib/utils";
import { Link, useLocation, type LinkProps } from "react-router";

interface Props extends LinkProps { }

export function NavLink(props: Props) {
  const { pathname } = useLocation()

  return <Link
    data-active={pathname === props.to}
    className={cn( 
      "flex items-center gap-1.5 text-sm font-medium text-muted-foreground",
      "hover:text-foreground data-[active=true]:text-foreground data-[active=true]:font-bold"
    )}
    {...props}
  />
}