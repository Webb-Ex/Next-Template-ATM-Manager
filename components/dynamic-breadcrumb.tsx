"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routeMap } from "@/lib/routeMap";

export default function DynamicBreadcrumb() {
  const pathname = usePathname(); 

  let currentPath = pathname;
  
  const currentRoute = Object.values(routeMap).find(route => currentPath === route.link);

  if (!currentRoute) return null; 

  const breadcrumbItems = [];

  
  if (currentRoute.group) {
    breadcrumbItems.push({
      name: currentRoute.group,
      href: routeMap[currentRoute.parent || '']?.link || '/', 
    });
  }

  breadcrumbItems.push({
    name: currentRoute.name,
    href: currentRoute.link,
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbItems.length - 1 ? (
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            ) : (
              <>
                <Link href={item.href}>
                  {item.name}
                </Link>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
