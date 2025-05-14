import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Input,
    Button,
    SimpleGrid,
    VisuallyHidden,
    Heading,
    Flex,
    Field,
} from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import { CustomButton } from '../ui/CustomButton';


interface FormValues {
    email: string
}


export function Footer() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    return (
        <Flex
            w='100%'
            bg={'brandBg'}
            flexDir={'column'}
            p={8}
        >
            <Flex py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={8}>
                    <Stack align={'flex-start'}>
                        <Heading size="sm" mb={2}>
                            CONTACT US
                        </Heading>
                        <Text>+1 (844) 326-6000</Text>
                        <Link href={'mailto:emailus@example.com'}>Email Us</Link>
                        <Text>Mon-Fri 9am-3pm PT</Text>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Heading size="sm" mb={2}>
                            CUSTOMERS
                        </Heading>
                        <Link href={'#'}>Start a Return</Link>
                        <Link href={'#'}>Return Policy</Link>
                        <Link href={'#'}>FAQ</Link>
                        <Link href={'#'}>Catalogs and Mailers</Link>
                        <Link href={'#'}>About Group Gifting</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Heading size="sm" mb={2}>
                            COMPANY
                        </Heading>
                        <Link href={'#'}>About Us</Link>
                        <Link href={'#'}>Sustainability</Link>
                        <Link href={'#'}>Discover Revive</Link>
                        <Link href={'#'}>Careers</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Terms</Link>
                    </Stack>

                    <Stack align={'flex-start'} gap={4}>
                        <Heading size="sm" mb={2}>
                            Get the latest new from us
                        </Heading>
                        <form style={{width:'100%'}}>
                            <Field.Root invalid={!!errors.email} w='100%'>
                                <VisuallyHidden>

                                    <Field.Label>Enter your email address</Field.Label>
                                </VisuallyHidden>
                                <Input
                                    {...register("email")}
                                    bg={'brandBg'}
                                    w='100%'
                                    border={'1px solid'}
                                    borderColor={'borderColor'}
                                    _focus={{
                                        bg: 'white',
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                    placeholder="Enter your email address"
                                    type="email"
                                />
                            </Field.Root>
                        </form>
                        <Text fontSize={'xs'}>
                            By signing up, you agree to our{' '}
                            <Link href={'#'} color={'blue.500'}>
                                Privacy Policy
                            </Link>{' '}
                            and{' '}
                            <Link href={'#'} color={'blue.500'}>
                                Terms of Service
                            </Link>
                            .
                        </Text>
                        <CustomButton text='Subscribe' isDark={true}/>
                    </Stack>
                </SimpleGrid>
            </Flex>

            <Flex>
                <Flex
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    gap={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}>
                    <Text>©CEIN</Text>
                    {/* You can add social media icons or other links here if needed */}
                </Flex>
            </Flex>
        </Flex>
    );
}