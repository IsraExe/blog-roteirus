type ModalRootProps = {
  open: boolean;
  children: React.ReactNode;
};

export default function ModalRoot({ open, children }: ModalRootProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        {children}
      </div>
    </div>
  );
}
