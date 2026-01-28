
import { useEffect, useState } from 'react'
import './App.css'
import type { ProductResponse } from './types/products'

function App() {
  const [data, setData] = useState<ProductResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("https://dummyjson.com/products")
        if (!response.ok) return new Error("Something went wrong")
        const data = await response.json()
        setData(data)
        console.log(data)

        // fetch("https://dummyjson.com/products").then((res) => {
        //   return res.json()
        // }
        // ).then((data) => {
        //   console.log(data)
        //   return data
        // }).catch((err) => {
        //   return new Error(err)
        // })

      } catch (error: unknown) {
        setError(error?.message)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getProducts()
  }, [])
  return (
    <>
      {error && <p>
        {error}
      </p>}
      {isLoading && <div>
        <p>Loading...</p>
      </div>}

      {data && data?.products.length > 0 && data?.products?.map(product => (
        <div key={product.id}>
          <h2>
            {product.title}
          </h2>
          <img src={product.thumbnail} alt={product.title} />
        </div>
      ))}
    </>
  )
}

export default App
