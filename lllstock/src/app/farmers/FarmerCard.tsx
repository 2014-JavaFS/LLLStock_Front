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
import Link from "next/link";
import type { Farmer } from "../types/farmer";

const FarmerCard: React.FC<{farmer: Farmer}> = ({farmer}) => (
    <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <CardTitle className="text-xl font-semibold mb-2">
            {farmer.firstName} {farmer.lastName}
        </CardTitle>
        <CardContent className="text-gray-700 mb-4">
            Email: {farmer.email}
        </CardContent>
        <div className="flex space-x-4">
            <Link href={`/farmers/${farmer.userId}`} passHref>
                <Button className="mr-4">View User Data</Button>
            </Link>
            <Link href={`/farmers/${farmer.userId}/cattle`} passHref>
                <Button>View Livestock</Button>
            </Link>
        </div>
    </Card>

);

export default FarmerCard;