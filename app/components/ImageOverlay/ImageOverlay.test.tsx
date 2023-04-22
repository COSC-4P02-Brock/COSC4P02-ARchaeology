import { render, screen } from "@testing-library/react"

import { ImageOverlay } from "./ImageOverlay";

test("renders default image overlay component", () =>  {5
    const url = '/img/warning.png'
    const text = 'valid url'
    const alt = 'axe1'

    render(<ImageOverlay url={url} text={text} alt={alt}/>)

    const image = screen.getByRole('img', {name:alt})

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', url);
});

test("renders image overlay component if not given alt value", () => {
    const url = '/img/warning.png'
    const text = 'valid url'

    render(<ImageOverlay url={url} text={text} />)

    const image = screen.getByRole('img', {name:text})

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', url);
});

test("renders image overlay component if given invalid url", () => {
    const url ='/img/warning.pjg'
    const text = 'valid url'
    const alt = 'warning'

    render(<ImageOverlay url={url} text={text} alt={alt}/>)

    const image = screen.getByRole('img', {name:alt})
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', "/img/warning.png")

    let caption : HTMLElement | null = screen.getByText('Invalid File')
    expect(caption).toBeInTheDocument();
    caption = screen.queryByText(text);
    expect(caption).toBeFalsy();
});