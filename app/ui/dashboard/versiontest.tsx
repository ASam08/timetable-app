import { testConnection } from "@/lib/data";

export default async function VersionTest() {
    const dbversion = await testConnection();

    return (
        <div className="mt-6 w-1/3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            {dbversion?.map((version) => (
                <p key={version.version} className="text-gray-500 dark:text-gray-500">DB Version Detail: {version.version}</p>
            ))}
        </div>
    );
}