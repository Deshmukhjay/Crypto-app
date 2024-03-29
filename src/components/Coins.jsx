import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import Error from './Error'
import CoinCard from './CoinCard'


const Coins = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, seterror] = useState(false)
  const [page, setpage] = useState(1)
  const [currency, setcurrency] = useState('inr')

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const changePage = (page) => {
    setpage(page);
    setLoading(true);
  }

  const btns=new Array(132).fill(1)

  useEffect(() => {

    const fetchcoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)

        setCoins(data)
        setLoading(false)

      } catch (error) {
        seterror(true)
        setLoading(false)
      }

    }
    fetchcoins();
  }, [currency, page])

  if (error) return <Error message={'API Kaam Nhi Kr Rha Reee...'}/>
  return (
    <Container maxW={'container.xl'} >{loading ? <Loader /> : <>
    <RadioGroup value='currency' onChange={setcurrency} p={'8'}>
      <HStack spacing={'4'}>
        <Radio value='inr'>INR</Radio>
        <Radio value='eur'>EUR</Radio>
        <Radio value='usd'>USD</Radio>

      </HStack>
    </RadioGroup>
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {coins.map((i) => (
          <CoinCard key={i.id} id={i.id} price={i.current_price} name={i.name} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
        ))}
      </HStack>

      <HStack w={'full'} overflowX={'auto'}p={'8'}>
      {
        btns.map((item,index)=>(
          <Button bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(index+1)}>{index+1}</Button>
        ))
      }
      </HStack>
    </>}
    </Container>
  )
}



export default Coins