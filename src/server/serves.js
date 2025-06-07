import { useState, useEffect } from "react";
export const BASE_API_URL = "https://agazatyapi.runasp.net";
export const roleName = localStorage.getItem("roleName");
export const token = localStorage.getItem("token");
export const userID = localStorage.getItem("userID");
export const UserData = JSON.parse(localStorage.getItem("UserData"));
export const rowsPerPage = "20";

export function useUserData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (userID) {
      fetch(`${BASE_API_URL}/api/Account/GetUserById/${userID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [userID]);

  return userData;
}

export async function downloadActiveUsersExcel() {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/Account/export-active-users-excel`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "active-users.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the Excel file:", error);
  }
}

// export async function GetUserById() {
//   fetch(`${BASE_API_URL}/api/Account/GetUserById/${userID}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
// }

export function validate(id, title, numMax) {
  const input = document.getElementById(id);
  if (input.value > numMax) {
    input.setCustomValidity(`${title}.`);
  } else {
    input.setCustomValidity("");
  }
}
