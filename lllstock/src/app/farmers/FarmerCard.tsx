"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";


interface FarmerInformation {
    user: number;
    firstName: string;
    lastName: string;
    email: string;
}

const FarmerCard: React.FC<{farmer: FarmerInformation}> = ({farmer}) => (
    <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <CardTitle>{farmer.firstName} {farmer.lastName}</CardTitle>
        <CardContent>Email: {farmer.email}</CardContent>
        <Button onClick={()=>toast(`${farmer.email}`)}>View Livestock</Button>
    </Card>
);

export default FarmerCard;