interface PatientInterface {
    password: string,
    patient: {
        name: string,
        email: string,
        contactNumber: string
    }
}

interface DoctorInterface {
    password: string,
    doctor: {
        name: string,
        role: string,
        email: string,
        gender: string,
        address?: string,
        experience: number,
        designation: string,
        profilePhoto?: string,
        contactNumber: string,
        qualification: string,
        appointmentFee: number,
        registrationNumber: string,
        currentWorkingPlace: string,
    }
}

interface AdminInterface {
    password: string,
    admin: {
        name: string,
        email: string,
        address?: string,
        profilePhoto?: string,
        contactNumber: string,
    }
}

export { PatientInterface, DoctorInterface, AdminInterface }