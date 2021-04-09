export interface PersonalData {
    first_name: string;
    last_name: string;
    nationality: string;
    mobileno: string;
    email: string;
    passportNo: string;
    passportIssueDate?: any;
    passportCity?: string;
    passportCountry?: string;
    passportExpiryDate?: any;
    birth_date?: any;
    birth_place?: string;
    city?: string;
    country?: string;
    address?: string;
};

export type CheckInData = {
    last_name: string;
    flight_no: string;
};