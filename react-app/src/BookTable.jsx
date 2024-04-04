import {ChakraProvider, Image, Box, Input, Button, FormControl} from '@chakra-ui/react';

const BookTable = () => {
    return (
        <ChakraProvider>
            <Image
                src="https://i0.wp.com/i9.photo.2gis.com/images/branch/0/30258560091801704_3797.jpg?ssl=1"
                alt="https://mykaleidoscope.ru/uploads/posts/2020-03/1584287339_3-p-shikarnie-intereri-kafe-6.jpg"
                mb={4}
                width="100%"
            />
            <Box maxW="md" mx="auto" p={4}>
                <FormControl id="email" isRequired>
                    <Input type="text" placeholder="Введите своё ФИО"/>

                </FormControl>
                <FormControl id="password" isRequired mt={4}>
                    <Input type="number" placeholder="Введите свой номер"/>
                </FormControl>
                <Button colorScheme="blue" mt={4} width='100%'>
                    Отправить
                </Button>
            </Box>
        </ChakraProvider>
    );
};

export default BookTable;
