import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
} from '@chakra-ui/react'
import { useState } from 'react';

interface FormData {
    prompt: string;
    width: string;
    height: string;
    guidanceScale: string;
    negativePrompt: string;
}


const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        prompt: '',
        width: '',
        height: '',
        guidanceScale: '',
        negativePrompt: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("hello")


        setFormData({
            prompt: '',
            width: '',
            height: '',
            guidanceScale: '',
            negativePrompt: '',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <VStack spacing={4} align="stretch" display="flex" justifyContent="center" alignItems="center">
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Image Generation</FormLabel>
                    <Input type='text' placeholder='prompt' name='prompt' value={formData.prompt} onChange={handleChange} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Width</FormLabel>
                    <Input type='number' placeholder='width' name='width' value={formData.width} onChange={handleChange} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Height</FormLabel>
                    <Input type='number' placeholder='height' name='height' value={formData.height} onChange={handleChange} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Guidance Scale</FormLabel>
                    <Input type='text' placeholder='guidance_scale' name='guidanceScale' value={formData.guidanceScale} onChange={handleChange} />
                </FormControl>

                <FormControl>
                    <FormLabel>Negative Prompt</FormLabel>
                    <Input type='text' placeholder='negative prompt' name='negativePrompt' value={formData.negativePrompt} onChange={handleChange} />
                </FormControl>

                <Button type="submit" colorScheme="teal" mt={4}>
                    Submit
                </Button>
            </form>
        </VStack>
    )
}

export default Form
