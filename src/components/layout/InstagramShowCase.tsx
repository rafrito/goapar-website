import { Flex, Image, Icon, Link } from "@chakra-ui/react";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CustomText } from "../ui/CustomText";

export function InstagramShowCase() {
    const instagramPhotos = [
        { id: 1, src: "/instagram/insta-1.png" },
        { id: 2, src: "/instagram/insta-2.png" },
        { id: 3, src: "/instagram/insta-3.png" },
        { id: 4, src: "/instagram/insta-4.png" },
        { id: 5, src: "/instagram/insta-5.png" },
    ];

    return (
        <Flex flexDir="column" alignItems={"center"} justifyContent={"center"} gap={4} w={"100%"} >
            <Flex p={8}>
                <CustomText text={"Shop Instagram"} fontSize={"lg"} />
            </Flex>
            <Flex py={{base:0, md:8}}>
                {instagramPhotos.map((photo) => {
                    
                    return (
                        <Link href='https://www.instagram.com/yourprofile/' target="_blank" key={photo.id}>
                        <Flex
                            key={photo.id}
                            p={2}
                            alignItems={"center"}
                            justifyContent={"center"}
                            position="relative" // Needed for absolute positioning of the overlay
                            _hover={{
                                "& > div": { // Target the overlay div
                                    opacity: 1,
                                },
                                "& > img": { // Target the image
                                    filter: "brightness(50%)",
                                }
                            }}
                        >
                            <Image src={photo.src} alt={"Instagram photo"} boxSize={251} objectFit={"cover"} transition="filter 0.3s ease-in-out" />
                            <Flex
                                position="absolute"
                                top="0"
                                left="0"
                                right="0"
                                bottom="0"
                                alignItems="center"
                                justifyContent="center"
                                opacity={0} // Hidden by default
                                transition="opacity 0.3s ease-in-out"
                                // bg="rgba(0, 0, 0, 0.3)" // Optional: if you want a darker overlay instead of darkening the image directly
                            >
                                <Icon as={PiInstagramLogoThin} boxSize={8} color="white" />
                            </Flex>
                        </Flex>
                        </Link>
                    );
                })}
            </Flex>
        </Flex>
    );
}