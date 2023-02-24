import { useState } from "react";

interface Props {
  openLabel: string;
  closedLabel: string;
  children: any;
}

//TWGN: Any built in tool or library for this feature?
function Collapsible(props: Props) {
  const { openLabel, closedLabel, children }: Props = props;

  const [open, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="border-2 border-black rounded-md bg-slate-400  p-2"
        onClick={toggle}
      >
        {open ? openLabel : closedLabel}
      </button>
      <div>{open && <div className="toggle">{children}</div>}</div>
    </div>
  );
}

export default Collapsible;
