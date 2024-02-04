import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Container,
} from '@chakra-ui/react'
import { useState } from 'react';

interface FormData {
    prompt: string;
    width: string;
    height: string;
    guidanceScale: string;
    negativePrompt: string;
}
interface ImageData {
    status: string;
    image_path: string;
}


const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        prompt: '',
        width: '',
        height: '',
        guidanceScale: '',
        negativePrompt: '',
    });
    const [image, setImage] = useState<ImageData | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        fetch("http://127.0.0.1:8000/generate_image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
                setImage(data);
                setFormData({
                    prompt: '',
                    width: '',
                    height: '',
                    guidanceScale: '',
                    negativePrompt: '',
                });
            })
            .catch(error => {
                console.error('Error:', error);
            }).finally(() => {
                setIsLoading(false);
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
        <>
            <VStack spacing={4} align="stretch" display="flex" justifyContent="center" alignItems="center">
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Prompt</FormLabel>
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
            <Container display="flex" justifyContent="center" alignItems="center">
                {isLoading && <p>Loading...</p>}
                {image && (
                    <div>
                        <img src={`data:image/png;base64,${image?.image_path}`} alt="Generated Image" />
                    </div>
                )}
            </Container>
        </>
    )
}

export default Form
