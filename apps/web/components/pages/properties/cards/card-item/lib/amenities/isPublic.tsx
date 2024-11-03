const IsPublic = ({ isPublic }: { isPublic: boolean }) => {
  const display = isPublic ? "Public" : "Private";

  return (
    <div className="text-slate-500 flex gap-1 -ml-1">
      <p className="text-sm whitespace-nowrap">{display}</p>
    </div>
  );
};

export default IsPublic;
