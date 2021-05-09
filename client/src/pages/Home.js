import React, { useState } from 'react';
import { signin } from '../sections/Donate';
import {
  ChakraProvider,
  Text,
  HStack,
  VStack,
  Heading,
  Grid,
  GridItem,
  theme,
  Flex,
  Spacer,
  Image,
  Select,
  Box,
} from '@chakra-ui/react';

import '../CSS/index.css';
import { Component } from 'react';
import { PatternRight } from '../PatternRight';
import Navbar from '../components/Navbar';
import paper from '../images/logo-paper.png';

const Home = () => {
  const [name, setName] = useState('');
  return (
    <ChakraProvider>
      <Grid
        className="container"
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        <GridItem
          alignSelf="center"
          w="100%"
          colSpan={1}
          colStart={2}
        ></GridItem>

        <GridItem align="right" marginLeft={3} alignSelf="center" colSpan={2}>
          <VStack>
            <Heading className="title">
              {''}
              زائد{' '}
            </Heading>
            <Text className="subtitle">
              المنصة الاولى Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Quisquam vitae excepturi ipsum voluptatum tempore nobi
            </Text>
          </VStack>
        </GridItem>

        <GridItem rowSpan={1} colSpan={2} h="50vmax" alignSelf="flex-end">
          <PatternRight />
        </GridItem>

        <GridItem colSpan={4} alignSelf="center">
          <HStack className="bottom">
            <VStack>
              <Heading className="title">ضماننا</Heading>{' '}
              <Image w="10%" src={paper} />
              <Navbar name={name}></Navbar>
            </VStack>
            <VStack>
              <Heading className="title">هدفنا</Heading>{' '}
              <Image w="10%" src={paper} />
              <Text
                className="subtitle"
                align="right"
                maxW="30ch"
                updateName={name => setName(name)}
              >
                زائد المنصة الاولى Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Quisquam vitae excepturi ipsum voluptatum
                tempore nobi
              </Text>
            </VStack>
            <VStack>
              <Heading className="title">من نحن</Heading>{' '}
              <Image w="10%" src={paper} />
              <Text className="subtitle" align="right" maxW="30ch">
                زائد المنصة الاولى Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Quisquam vitae excepturi ipsum voluptatum
                tempore nobi
              </Text>
            </VStack>
          </HStack>
          <Text
            marginTop={10}
            className="subtitle"
            align="right"
            alignItems="flex-end"
          >
            زائد المنصة الاولى Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quisquam vitae excepturi ipsum voluptatum tempore
            nobi
          </Text>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};
export default Home;
