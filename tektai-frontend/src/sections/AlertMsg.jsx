import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
const AlertMsg = ({status='success', title, desc}) => {
    console.log(status,title,desc)
    return (
        <Alert status={status} className="absolute top-28 left-12 z-99 mb-2">
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{desc}</AlertDescription>
        </Alert>
    )
}

export default AlertMsg;