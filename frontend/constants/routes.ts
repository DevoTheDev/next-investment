export interface NavItem {
    route: `/${string}`
    title: string
    imgUrl?: string
}

export const rootNavValues: NavItem[] = [
    {
        route: "/portfolio",
        imgUrl: "./person-folder.svg",
        title: "Portfolio",
    },
    {
        route: "/market",
        imgUrl: "./money-note.svg",
        title: "Market",
    },
]