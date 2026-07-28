interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="rounded-md border border-red-500 p-4 text-red-600">
      {message}
    </div>
  );
}
