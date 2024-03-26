// challenge.dto.ts
export class ChallengeDto {
    _id: string;
    title: string;
    image: string;
    company_id: string;
    prize: string;
    status: 'Ongoing' | 'Completed' | 'Upcoming';
    description: string;
    start_date: Date; // Date with hours and minutes
    deadline: Date; // Date with hours and minutes
    dataset: string;
}
