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
