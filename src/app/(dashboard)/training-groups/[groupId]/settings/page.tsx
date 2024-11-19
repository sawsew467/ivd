import { TabsContent } from "@/components/ui/tabs";
import React from "react";

function SettingsPage() {
  return (
    <TabsContent value="settings">
      <div className="bg-secondary p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Group Settings</h2>
        <p>
          Group settings content goes here. This could include options to edit
          group details, set permissions, etc.
        </p>
      </div>
    </TabsContent>
  );
}

export default SettingsPage;
