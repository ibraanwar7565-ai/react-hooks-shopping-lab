import { useState } from 'react'

const products = [
  { id: 1, name: 'Milk', category: 'Dairy' },
  { id: 2, name: 'Cheese', category: 'Dairy' },
  { id: 3, name: 'Apples', category: 'Produce' },
  { id: 4, name: 'Bananas', category: 'Produce' },
  { id: 5, name: 'Chicken', category: 'Meat' },
  { id: 6, name: 'Beef', category: 'Meat' },
  { id: 7, name: 'Bread', category: 'Bakery' },
  { id: 8, name: 'Bagels', category: 'Bakery' },
]

const categories = ['All', ...new Set(products.map((p) => p.category))]

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)

  const addToCart = (name) => {
    if (!cart.includes(name)) {
      setCart((prev) => [...prev, name])
    }
  }

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <h1>Shopping App</h1>

      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Dark' : 'Light'}
      </button>

      <div>
        <label htmlFor="category-filter">Filter by category: </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <span>{product.name}</span>
              <button onClick={() => addToCart(product.name)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item}>{item} is in your cart.</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
