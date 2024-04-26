// challenge.dto.ts
export class ChallengeDto {
    title: string;
    image: string;
    company_id: string;
    prize: string;
    visibility:'Public' |  'Private';
    eligible_participants:'Anyone' |  'Invitation-only';
    status: 'Ongoing' | 'Completed' | 'Upcoming';
    description: string;
    start_date: Date; // Date with hours and minutes
    deadline: Date; // Date with hours and minutes
    dataset: string;
    maxTeam: string;
    barem: string[]; // assuming barem is a list of strings, adjust the type accordingly


}
