import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Image, Text, VStack } from '@chakra-ui/react'


const CoinCard = ({ id, name, img, price, symbol, currencySymbol = "₹" }) => (
    <Link to={`/coin/${id}`}>
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'}
            css={{
                "&:hover": {
                    transform: "scale(1.1)"
                }
            }}>
            <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='Exchange' />
            <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
            <Text size={'md'}>{name} </Text>
            <Text size={'md'}>{price ? `${currencySymbol}${price}` : "NA"} </Text>

        </VStack>
    </Link>
)


export default CoinCard