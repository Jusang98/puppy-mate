import useMapStore from '@/store/useMapStore';
import { getDistance } from '@/utils/getDistance';
import { getCoordinateAddress } from '@/utils/getCoordinateAddress';
import { createCourse } from '@/api/course';

export const useCourseSave = async (name: string) => {
  const { coordinates, startTime } = useMapStore();

  const duration = new Date().getTime() - startTime;
  let totalDistance = 0;
  let address = '';
  // 도로 좌표 {lat: 37.56423690189401, lng: 127.00764941529607}
  coordinates.forEach((coord, index) => {
    if (index > 0) {
      totalDistance += getDistance(coordinates[index - 1], coord);
    }
  });

  try {
    address = await getCoordinateAddress(coordinates[0].lng, coordinates[0].lat);
  } catch (error) {
    console.error('Error fetching address:', error);
  }
  try {
    // createCourse 호출
    const courseId = await createCourse(name, address, totalDistance, duration, coordinates);
    console.log(`Course saved successfully with ID: ${courseId}`);
  } catch (error) {
    console.error('Failed to save course:', error);
  }
};
