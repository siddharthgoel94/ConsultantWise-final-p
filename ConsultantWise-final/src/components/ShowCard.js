import DoctorCard from "./DoctorCard"
import './Finddoctor.css'
// receiving all the doctor's all details from autocomplete search bar
const ShowCard = (props) => {
    console.log(props.data)
    // props.data.sort((a, b) => b.rating - a.rating);
    // console.log(props.data)
    return (props.data.length>0 && props.data.map((doctor) => (<li key={doctor.id}>
            <DoctorCard
                name={`${doctor.fName} ${doctor.lName}`}
                age={doctor.age}
                pictureUrl={doctor.imageUrl}
                city={doctor.city}
                specialty={doctor.speciality}
                // experience={doctor.experience}
                clinicName={doctor.hospital}
                rating={doctor.rating}
                id={doctor.id} 
                date={props.date}/>
        </li>)
    ));
}

export default ShowCard;