
import { Button } from "@/components/ui/button";
export type ViewMode = "initial" | "simple" | "advanced" | "agent";
const VIEW_OPTIONS: Array<{ label: string; value: ViewMode }> = [
    { label: "Simple", value: "simple" },
    { label: "Advanced", value: "advanced" },
    { label: "Agent", value: "agent" },
];

const SelectMode = () => {
    return (
        <div className='flex flex-col items-center justify-center p-4 space-y-3'>
            <h1>Select Mode</h1>
            <p>Choose a view mode to continue</p>
            <div className="inline-flex inset-shadow-sm inset-shadow-[#1d4ed8] items-center gap-1 rounded-lg  p-2">
                {VIEW_OPTIONS.map((view,index) => (
                    <Button value={view.value} key={index} className="bg-transparent hover:bg-transparent hover:text-[#007bff]">
                        {view.label}
                    </Button>
                ))}

            </div>
        </div>

    )
}

export default SelectMode