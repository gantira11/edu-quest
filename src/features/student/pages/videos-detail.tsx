import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailSubject } from '@/features/subjects/services';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import NoData from '@/shared/components/ui/no-data';
import { Separator } from '@/shared/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { map, reject } from 'lodash';
import { IVideo } from '@/features/subjects/utils/interfaces';

interface Video {
  id: string;
  name: string;
  file_url: string;
}

interface SubjectData {
  id: string;
  name: string;
  videos: Video[];
}

interface IndexedDBResult {
  id: string;
  name: string;
  blob: Blob;
}

const setupIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open('videoDB', 1);

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos', { keyPath: 'id' });
      }
    };

    dbRequest.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    dbRequest.onerror = (event) => {
      console.log((event.target as IDBRequest).error);
      reject(event?.target);
    };
  });
};

const saveVideoToIndexedDB = async (
  db: IDBDatabase,
  video: IVideo
): Promise<void> => {
  const videoBlob = await fetch(`${video.file_url}`).then((res) => res.blob());
  const transaction = db.transaction('videos', 'readwrite');
  const store = transaction.objectStore('videos');
  const videoData = {
    id: video.id,
    name: video.name,
    blob: videoBlob,
  };
  store.put(videoData);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(transaction.error);
    };

    transaction.onabort = () => {
      reject(transaction.error);
    };
  });
};

const getVideoFromIndexedDB = async (
  db: IDBDatabase,
  videoId: string
): Promise<IndexedDBResult | undefined> => {
  const transaction = db.transaction('videos', 'readonly');
  const store = transaction.objectStore('videos');
  return new Promise((resolve, _) => {
    const request = store.get(videoId);
    request.onsuccess = () => {
      resolve(request.result as IndexedDBResult | undefined);
    };
    request.onerror = (event) => {
      console.log((event.target as IDBRequest).error);
      reject(event.target);
    };
  });
};

const VideosDetail: React.FC = () => {
  const params = useParams();
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [videoURLs, setVideoURLs] = useState<Record<string, string>>({});

  // Get subject detail data using useQuery
  const { data } = useQuery({
    queryKey: ['GET_DETAIL_SUBJECT', params.id],
    queryFn: getDetailSubject,
    enabled: !!params.id,
    select: (data) => data?.data?.data,
  });

  // Initialize IndexedDB when the component mounts
  useEffect(() => {
    setupIndexedDB().then((database) => {
      setDb(database);
    });
  }, []);

  // Save videos to IndexedDB and retrieve them for display
  useEffect(() => {
    if (db && data?.videos) {
      data.videos.forEach((video: IVideo) => {
        // Check if the video is already in IndexedDB
        getVideoFromIndexedDB(db, `${video.id}`).then((result) => {
          if (!result) {
            // If the video is not in IndexedDB, save it
            saveVideoToIndexedDB(db, video);
          } else {
            // If the video is in IndexedDB, create an object URL and save it to state
            const videoURL = URL.createObjectURL(result.blob);
            setVideoURLs((prevState) => ({
              ...prevState,
              [`${video.id}`]: videoURL,
            }));
          }
        });
      });
    }
  }, [db, data]);

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Videos',
        path: '/student/videos',
      },
      {
        label: data?.name ?? '',
        path: '',
      },
    ],
    [data]
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
        </CardHeader>

        <Separator className='mb-10' />

        <CardContent>
          {data?.videos?.length > 0 ? (
            map(data?.videos, (video) => (
              <Card
                className='flex w-full flex-col gap-2 overflow-hidden rounded-sm lg:w-max'
                key={video.id}
              >
                <video controls>
                  <source
                    src={videoURLs[video.id] || video.file_url}
                    type='video/mp4'
                  />
                  <track kind='captions' label='English' />
                  Your browser does not support the video tag.
                </video>

                <CardContent>
                  <p className='text-center text-sm font-medium'>
                    {video.name}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <NoData />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideosDetail;
