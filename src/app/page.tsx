import { About } from "@/components/layout/About/About";
import { Cases } from "@/components/layout/Cases/Cases";
import { CasesContainer } from "@/components/layout/Cases/CasesContainer";
import { CustomersCarousel } from "@/components/layout/Customers/CustomersCarousel";
import { FeedbacksCarousel } from "@/components/layout/Feedbacks/FeedbacksCarousel";
import { Main } from "@/components/layout/Main/Main";
import { ProductCarousel } from "@/components/layout/Products/ProductCarousel";
import { awerTestimonials } from "@/data/testimonials";

export default function Home() {

  return (
    <>
      <Main />
      <CasesContainer/>
      <ProductCarousel />
      <FeedbacksCarousel testimonial={awerTestimonials[0]}/>
      <About />
    </>
  );
}
