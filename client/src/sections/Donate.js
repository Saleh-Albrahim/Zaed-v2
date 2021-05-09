import {
  Input,
  Button,
  VStack,
  StackDivider,
  Text,
  Image,
  Flex,
  HStack,
  Grid,
  Select,
  Span,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberDecrementStepper,
  NumberInputField,
  NumberInput,
  NumberIncrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';
import 'react-icons';
import '../CSS/index.css';
import { Logo } from '../Logo';
import { PhoneIcon, AddIcon, InfoIcon } from '@chakra-ui/icons';
import '../components/formController';
import { Formik } from 'formik';
import { render } from 'react-dom';

import React, { Component, useState, setState } from 'react';
import { string } from 'prop-types';
