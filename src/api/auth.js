// api/auth.js
import axiosInstance from './axiosInstance';
import axiosInstanceLaravel from './axiosInstanceLaravel';

export const login = async (credentials) => {
  const response = await axiosInstance.post('login_otp_mobile', credentials);
  return response.data;
};
export const OTP_verify = async (credentials) => {
  const response = await axiosInstance.post('verify_login', credentials);
  return response.data;
};
export const fetch_home = async () => {
  const response = await axiosInstance.post('fetch_home');
  return response.data;
};

export const my_account = async () => {
  const response = await axiosInstance.post('fetch_home');
  return response.data;
};

//Profile Related Routes ====================================
export const profile = async (credentials) => {
  const response = await axiosInstance.post('profile', credentials);
  return response.data;
};
export const profile_update = async (credentials) => {
  const response = await axiosInstanceLaravel.post('profile_update', credentials,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};
//=====================================================


export const home_properties = async () => {
  const response = await axiosInstanceLaravel.post('home_properties');
  return response.data;
};

export const property_details = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_preview', credentials);
  return response.data;
};

//Post Property Step 1 routes =============================
export const property_type_master = async () => {
  const response = await axiosInstanceLaravel.post('master_property_type');
  return response.data;
};

export const bhk_type_master = async () => {
  const response = await axiosInstanceLaravel.post('master_bhk_type');
  return response.data;
};

export const facing_master = async () => {
  const response = await axiosInstanceLaravel.post('master_facing');
  return response.data;
};

export const age_master = async () => {
  const response = await axiosInstanceLaravel.post('master_property_age');
  return response.data;
};

export const floor_master = async () => {
  const response = await axiosInstanceLaravel.post('master_floor');
  return response.data;
};

export const master_building_type = async () => {
  const response = await axiosInstanceLaravel.post('master_building_type');
  return response.data;
};

export const post_properties_step1 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_step1', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};


//Post Property Step 2 routes ===================================
export const post_properties_step2 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_step2', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

//Post Property Step 3 routes ===================================
export const master_currency = async (credentials) => {
  const response = await axiosInstanceLaravel.post('master_master_currency', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const master_available_from = async (credentials) => {
  const response = await axiosInstanceLaravel.post('master_available_from', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const master_furnishings = async (credentials) => {
  const response = await axiosInstanceLaravel.post('master_furnishings', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const post_properties_step3 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_step3', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

//Post Property Step 4 routes ===================================
export const master_amenities = async (credentials) => {
  const response = await axiosInstanceLaravel.post('master_amenities', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const post_properties_step4 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_step4', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

//
export const post_properties_step6 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_step6', credentials);
  return response.data;
};

export const post_properties_step7 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('post_properties_step7', credentials, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};
// ==================================
export const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/user/profile');
  return response.data;
};
// ==================================Property Search
export const propertie_search = async (credentials) => {
  const response = await axiosInstanceLaravel.post('propertie_search', credentials);
  return response.data;
};

export const fileUploadMultiple = async (credentials) => {
  const response = await axiosInstanceLaravel.post('fileUploadMultiple', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

// ==================================Interrest Property
export const user_property_interests = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user_property_interests', credentials);
  return response.data;
};

// Other auth-related API calls...

// ==================================Donation History
export const donation_history = async (credentials) => {
  const response = await axiosInstanceLaravel.post('donation_history', credentials);
  return response.data;
};
// ==================================Property Search
export const user_type_update = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user_type_update', credentials);
  return response.data;
};

// ==================================My apartment on tenant side
export const my_apartment_for_tenant = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/my_apartment', credentials);
  return response.data;
};

// ==================================My property on owner side
export const my_properties_for_owner = async (credentials) => {
  const response = await axiosInstanceLaravel.post('my_properties', credentials);
  return response.data;
};

// ==================================My Documents all route
export const tenant_side_documents = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/my_tenant', credentials);
  return response.data;
};

export const landlord_side_documents = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/my_buyer', credentials);
  return response.data;
};

// ==================================Add documents for temp upload
export const add_document = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/add-document', credentials, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const send_document_to_user = async (credentials) => {
  const response = await axiosInstanceLaravel.post('add_document_user', credentials);
  return response.data;
};

export const send_document_to_user2 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('add_document', credentials);
  return response.data;
};

export const my_properties_builder = async (credentials) => {
  const response = await axiosInstanceLaravel.post('my_properties_builder', credentials);
  return response.data;
};

export const my_landlord = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/my_landlord', credentials);
  return response.data;
};

export const staff_list_builder = async (credentials) => {
  const response = await axiosInstanceLaravel.post('staff_list_builder', credentials);
  return response.data;
};

export const staff_list_owner_landlord = async (credentials) => {
  const response = await axiosInstanceLaravel.post('staff_list', credentials);
  return response.data;
};

export const properties_flat = async (credentials) => {
  const response = await axiosInstanceLaravel.post('properties_flat', credentials);
  return response.data;
};

export const staff_responsibility_master = async (credentials) => {
  const response = await axiosInstanceLaravel.post('staff_responsibility', credentials);
  return response.data;
};

export const staff_role_master = async (credentials) => {
  const response = await axiosInstanceLaravel.post('staff_role', credentials);
  return response.data;
};

export const sub_post_properties_step1 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('sub_post_properties_step1', credentials, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const add_staff_builder = async (credentials) => {
  const response = await axiosInstanceLaravel.post('add_staff_builder', credentials, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const add_notify_extension_owner = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/add_notify_extension_owner', credentials);
  return response.data;
};

export const support_ticket_list_tenant = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/support-list', credentials);
  return response.data;
};

export const create_support_ticket_tenant = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/add-support', credentials);
  return response.data;
};

export const staff_details = async (credentials) => {
  const response = await axiosInstanceLaravel.post('staff_details', credentials);
  return response.data;
};

export const staff_status_update_owner = async (credentials) => {
  const response = await axiosInstanceLaravel.post('staff_status_update', credentials);
  return response.data;
};

export const owner_support_list = async (credentials) => {
  const response = await axiosInstanceLaravel.post('owner_support_list', credentials);
  return response.data;
};

export const owner_support_list2 = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/support-list-owner', credentials);
  return response.data;
};

export const update_ticket_status_from_owner_builder = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/accept-tenant-support-complete', credentials);
  return response.data;
};
export const owner_leads_list = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/interest-detail-list', credentials);
  return response.data;
};
export const builder_leads_list = async (credentials) => {
  const response = await axiosInstanceLaravel.post('user/interest-detail-list-builder', credentials);
  return response.data;
};

export const broadcast_home_builder = async (credentials) => {
  const response = await axiosInstanceLaravel.post('broadcast_home_builder', credentials);
  return response.data;
};

export const add_broadcast_builder = async (credentials) => {
  const response = await axiosInstanceLaravel.post('add_broadcast_builder', credentials);
  return response.data;
};
export const services = async (credentials) => {
  const response = await axiosInstanceLaravel.post('services', credentials);
  return response.data;
};

export const join_service_provider = async (credentials) => {
  const response = await axiosInstanceLaravel.post('join_service_provider', credentials , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const donationlist = async (credentials) => {
  const response = await axiosInstanceLaravel.post('donationlist', credentials);
  return response.data;
};

export const apartment_user_details = async (credentials) => {
  const response = await axiosInstanceLaravel.post('apartment_user_details', credentials);
  return response.data;
};

export const donation_details = async (credentials) => {
  const response = await axiosInstanceLaravel.post('donation_details', credentials);
  return response.data;
};

export const customer_reviews = async (credentials) => {
  const response = await axiosInstanceLaravel.post('customer_reviews', credentials);
  return response.data;
};

export const faqs = async (credentials) => {
  const response = await axiosInstanceLaravel.post('faqs', credentials);
  return response.data;
};

export const about_us = async () => {
  const response = await axiosInstanceLaravel.get('about_us');
  return response.data;
};
export const privacy_policy = async () => {
  const response = await axiosInstanceLaravel.get('privacy_policy');
  return response.data;
};
export const terms_conditions = async () => {
  const response = await axiosInstanceLaravel.get('terms_conditions');
  return response.data;
};