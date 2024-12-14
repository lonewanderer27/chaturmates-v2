import useUniversityAnnouncements from '../../hooks/group/useUniversityAnnouncements';
import Slider from 'react-slick';
import AdminPostCardLoader from '../../loaders/AdminPostCardLoader';
import UniversityPostCard from './UniversityPostCard';

const UniversityPostsGrid = () => {
  const { universityAnnouncements: posts, group, query } = useUniversityAnnouncements();

  return (
    <Slider
      className='mx-[-10px]'
      infinite={true}
      autoplay
      autoplaySpeed={2500}
      dots
      appendDots={(dots) => (<div className='mt-[-20px]'>{dots}</div>)}>
      {(posts && !query.isFetching) ?
        posts.map((post) => (
          <UniversityPostCard key={post.id} group={group} post={post} />
        )) : (
          Array.from({ length: 6 }).map((_, i) => (
            <AdminPostCardLoader key={i} />
          ))
        )}
    </Slider>
  )
}

export default UniversityPostsGrid