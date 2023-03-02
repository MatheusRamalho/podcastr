import { SectionWrapper } from "./Section.styles";
import { SectionProps } from "./Section.types";

export const Section = ({ id, title, children }: SectionProps) => {
    return (
        <SectionWrapper id={id}>
            <h2>{title} </h2>

            {children}
        </SectionWrapper>
    );
}
