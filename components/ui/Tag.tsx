interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="px-3 py-1 bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] text-[11px] font-body rounded-full">
      {label}
    </span>
  );
}
