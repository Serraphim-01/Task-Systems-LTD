import { DirectorsSection } from "@/components/home/directors-section";
import { ManagementSection } from "@/components/home/management-section";

const PeoplePage = () => {
    return (
        <div className="bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <h1 className="text-4xl font-bold text-center mb-12">Our People</h1>
                <DirectorsSection />
                <ManagementSection />
            </div>
        </div>
    );
};

export default PeoplePage;
