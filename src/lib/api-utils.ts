import { WP_API_URL, WC_API_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } from './api-config';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function fetchWPAPI(endpoint: string, options: FetchOptions = {}) {
  const { params, ...fetchOptions } = options;
  const url = new URL(WP_API_URL + endpoint);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const headers = { 
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchWCAPI(endpoint: string, options: FetchOptions = {}) {
  const { params, ...fetchOptions } = options;
  const url = new URL(WC_API_URL + endpoint);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }
  url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
  url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);

  const headers = { 
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// WordPress API functions
export async function getPosts(page = 1, perPage = 10) {
  return fetchWPAPI('/wp/v2/posts', { params: { page: page.toString(), per_page: perPage.toString() } });
}

export async function getPost(id: number) {
  return fetchWPAPI(`/wp/v2/posts/${id}`);
}

export async function getPages(page = 1, perPage = 10) {
  return fetchWPAPI('/wp/v2/pages', { params: { page: page.toString(), per_page: perPage.toString() } });
}

export async function getPage(id: number) {
  return fetchWPAPI(`/wp/v2/pages/${id}`);
}

// WooCommerce API functions
export async function getProducts(page = 1, perPage = 10) {
  return fetchWCAPI('/products', { params: { page: page.toString(), per_page: perPage.toString() } });
}

export async function getProduct(id: number) {
  return fetchWCAPI(`/products/${id}`);
}

export async function createOrder(orderData: any) {
  return fetchWCAPI('/orders', { method: 'POST', body: JSON.stringify(orderData) });
}

export async function getOrder(id: number) {
  return fetchWCAPI(`/orders/${id}`);
}

export async function updateOrder(id: number, orderData: any) {
  return fetchWCAPI(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(orderData) });
}

export async function getCustomer(id: number) {
  return fetchWCAPI(`/customers/${id}`);
}

export async function createCustomer(customerData: any) {
  return fetchWCAPI('/customers', { method: 'POST', body: JSON.stringify(customerData) });
}

export async function updateCustomer(id: number, customerData: any) {
  return fetchWCAPI(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(customerData) });
}

// Yith Points and Rewards functions
export async function getCustomerPoints(customerId: number) {
  return fetchWCAPI(`/yith_points_and_rewards/customers/${customerId}/points`);
}

export async function addCustomerPoints(customerId: number, points: number, description: string) {
  return fetchWCAPI(`/yith_points_and_rewards/customers/${customerId}/points`, {
    method: 'POST',
    body: JSON.stringify({ points, description }),
  });
}

export async function getUserPoints(userId: number) {
  return fetchWCAPI(`/yith_points_and_rewards/customers/${userId}/points`)
}

export async function awardPoints(userId: number, points: number, reason: string) {
  return fetchWCAPI(`/yith_points_and_rewards/customers/${userId}/points`, {
    method: 'POST',
    body: JSON.stringify({ points, reason }),
  })
}

export async function redeemPoints(userId: number, points: number, reason: string) {
  return fetchWCAPI(`/yith_points_and_rewards/customers/${userId}/points`, {
    method: 'DELETE',
    body: JSON.stringify({ points, reason }),
  })
}

export async function getProductPointsValue(productId: number) {
  return fetchWCAPI(`/yith_points_and_rewards/products/${productId}/points`)
}

