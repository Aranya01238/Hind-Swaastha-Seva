export default function DoctorCard({ doctor }: { doctor: any }) {
  return (
    <div>
      <h3>{doctor.name}</h3>
      <p>{doctor.specialty} • {doctor.hospitalName}</p>
      <p>Rating: {doctor.rating}</p>
      <p>Fee: ₹{doctor.fee}</p>
    </div>
  );
}