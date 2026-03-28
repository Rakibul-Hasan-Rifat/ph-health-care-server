interface PatientInterface {
    password: string,
    patient: {
        name: string,
        email: string,
        contactNumber: string
    }
}

//   profilePhoto        String?
//   contactNumber       String
//   address             String
//   registrationNumber  String
//   experience          Int      @default(0)
//   gender              Gender?
//   appointmentFee      Int
//   qualification       String
//   currentWorkingPlace String
//   designation         String

interface DoctorInterface {
    password: string,
    doctor: {
        name: string,
        email: string,
        gender: string,
        address?: string,
        experience: number,
        designation: string,
        contactNumber: string,
        qualification: string,
        appointmentFee: number,
        registrationNumber: string,
        currentWorkingPlace: string,
    }
}

export { PatientInterface, DoctorInterface }