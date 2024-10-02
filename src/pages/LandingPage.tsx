import BannerLanding from '../components/BannerLanding/BannerLanding';
import ContentLanding from '../components/ContentLanding/ContentLanding';
import FooterLanding from '../components/FooterLanding/FooterLanding';
import HeaderLanding from '../components/HeaderLanding/HeaderLanding';
import NeighBorHood from '../components/NeighBorHood/NeighBorHood';

const LandingPage = () => {
	return (
		<div className='h-screen bg-[#FFFBF2]'>
			<HeaderLanding />
			<BannerLanding />
			<ContentLanding />
			<NeighBorHood />
			<FooterLanding />
		</div>
	);
};

export default LandingPage;
