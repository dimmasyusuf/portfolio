export default function Copyright() {
  const year = new Date().getFullYear() as number;

  return (
    <div className="flex justify-center items-center p-4">
      <p>&copy; {year} dimmasyusuf. All rights reserved.</p>
    </div>
  );
}
