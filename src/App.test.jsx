import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Dark Mode Toggle', () => {
  it('renders the dark mode button with initial text "Dark"', () => {
    render(<App />)
    expect(screen.getByText('Dark')).toBeInTheDocument()
  })

  it('changes button text to "Light" after clicking', () => {
    render(<App />)
    const button = screen.getByText('Dark')
    fireEvent.click(button)
    expect(screen.getByText('Light')).toBeInTheDocument()
  })

  it('toggles back to "Dark" after clicking twice', () => {
    render(<App />)
    const button = screen.getByText('Dark')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('Light'))
    expect(screen.getByText('Dark')).toBeInTheDocument()
  })
})

describe('Add to Cart', () => {
  it('shows cart item text after adding to cart', () => {
    render(<App />)
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])
    expect(screen.getByText('Milk is in your cart.')).toBeInTheDocument()
  })

  it('can add multiple items to cart', () => {
    render(<App />)
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[1])
    expect(screen.getByText('Milk is in your cart.')).toBeInTheDocument()
    expect(screen.getByText('Cheese is in your cart.')).toBeInTheDocument()
  })

  it('does not add duplicate items to cart', () => {
    render(<App />)
    const addButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[0])
    const cartItems = screen.getAllByText('Milk is in your cart.')
    expect(cartItems).toHaveLength(1)
  })
})

describe('Category Filter', () => {
  it('shows all products when "All" is selected', () => {
    render(<App />)
    expect(screen.getByText('Milk')).toBeInTheDocument()
    expect(screen.getByText('Apples')).toBeInTheDocument()
    expect(screen.getByText('Chicken')).toBeInTheDocument()
  })

  it('filters products by Dairy category', () => {
    render(<App />)
    const select = screen.getByLabelText('Filter by category:')
    fireEvent.change(select, { target: { value: 'Dairy' } })
    expect(screen.getByText('Milk')).toBeInTheDocument()
    expect(screen.getByText('Cheese')).toBeInTheDocument()
    expect(screen.queryByText('Apples')).not.toBeInTheDocument()
    expect(screen.queryByText('Chicken')).not.toBeInTheDocument()
  })

  it('filters products by Produce category', () => {
    render(<App />)
    const select = screen.getByLabelText('Filter by category:')
    fireEvent.change(select, { target: { value: 'Produce' } })
    expect(screen.getByText('Apples')).toBeInTheDocument()
    expect(screen.getByText('Bananas')).toBeInTheDocument()
    expect(screen.queryByText('Milk')).not.toBeInTheDocument()
  })
})
