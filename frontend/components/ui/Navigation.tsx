"use client";
import React from 'react'
import Link from 'next/link';
import { rootNavValues } from '@/constants/routes'
import { usePathname } from 'next/navigation';

export type NavItem = {
  route: `/${string}`;
  title: string;
  imgUrl?: string;
  [key: string]: any
}

type NavigationProps = {
  navigations: NavItem[];
  navItemStyles?: Pick<HTMLDivElement, 'className'>;
  activeNavStyles?: Pick<HTMLDivElement, 'className'>;
  containerStyles?: Pick<HTMLDivElement, 'className'>;
  children?: any

}

const Navigation = (props: NavigationProps) => {

  const { navigations, navItemStyles, activeNavStyles, containerStyles, children } = props;
  const pathName = usePathname();

  return (
      <>
      <div className={containerStyles?.className}>
          {navigations.map((nav) => {
              
              const pathIsActive = nav.route === pathName
              return (
                  <Link
                  key={navigations.indexOf(nav)}
                  href={nav.route}
                  >
                      <span className={`${pathIsActive ? activeNavStyles?.className : navItemStyles?.className}`}>{nav.title}</span>
                  </Link>
              )
          })}
          {children}
          </div>
          </>
  )
}
export default Navigation;
