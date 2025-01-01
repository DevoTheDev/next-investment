export type SpacerProps = {
    space: Spaces
    children: React.ReactNode
}

export type Sides = 'top' | 'left' | 'right' | 'bottom' | 'vertical' | 'horizontal';
export type Sizes = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'massive' | "Woah, you're big" | "Oh my god, you're huge" | "DAD!?" ;
export type Spaces = `${Sides}-${Sizes}` | Sizes;