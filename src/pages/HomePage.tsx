import ProductSlider from "../Components/ProductSlider/ProductSlider";
import BestSellers from "../Components/BestSellers/BestSellers";
import Productswrapper from "../Components/Productswrapper/Productswrapper";
import Slideshow from "../Components/Slideshow/Slideshow";
export default function Home() {
  return (
    <div>
        <Slideshow/>
        <ProductSlider/>
        <BestSellers/>
        <Productswrapper/>
    </div>
  )
}
