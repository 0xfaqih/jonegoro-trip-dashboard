import { Info } from "@/types/Info";
import { Souvenir } from "@/types/Souvenir";

export const getTourData = async (tourId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}`);
  return response.json();
};

export const updateTourData = async (tourId: number, data: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const postTourData = async (formValues: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const addImageToAPI = async (tourId: number, imageUrls: string[]) => {
  await Promise.all(imageUrls.map(async (url) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/add-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: tourId, url }),
    });
  }));
};

export const addInfo = async (data: { title: string; banner: string; content: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add info');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to add info', error);
    throw error;
  }
};

export const getInfos = async (): Promise<Info[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};

export const deleteInfo = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete info');
    }
  } catch (error) {
    console.error('Error deleting info:', error);
    throw new Error('Failed to delete info');
  }
}

export const updateInfo = async (data: Info): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update info');
    }
  } catch (error) {
    console.error('Error updating info:', error);
    throw new Error('Failed to update info');
  }
};

export const getInfoById = async (id: number): Promise<Info> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export const addSouvenir = async (data: { name: string; image: string; price: number }): Promise<any> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/souvenirs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add souvenir');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to add souvenir', error);
    throw error;
  }
}

export const getSouvenirs = async (): Promise<Souvenir[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/souvenirs`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export const deleteSouvenir = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/souvenirs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete souvenir');
    }
  } catch (error) {
    console.error('Error deleting souvenir:', error);
    throw new Error('Failed to delete souvenir');
  }
}

export const updateSouvenir = async (data: Souvenir): Promise<void> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/souvenirs/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update souvenir');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating souvenir:', error);
    throw new Error('Failed to update souvenir');
  }
}

export const getSouvenirsById = async (id: number): Promise<Souvenir> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/souvenirs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}