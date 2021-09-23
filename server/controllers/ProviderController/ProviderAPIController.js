const Provider = require('../../models/providers');
const Client = require('../../models/clients');

module.exports = class ProviderAPIController {

    // Create a provider
    static async createProvider(request, response){

        const provider = request.body;
        try{
            await Provider.create(provider);
            response.status(200).json(provider);
        }
        catch (error){
            response.status(404).json({ message: error.message});
        }
    }

    // Get all provider
    static async getAllProviders(request, response){

        try{
            const provider = await Provider.find();
            if(provider != null){
                response.status(200).json(provider);
            }
            else {
                response.status(200).json('No data');
            }
            
        } catch (error) {
            response.status(404).json({
                message: error.message
            });
        }
    }

    // Get a provider by id
    static async getProviderById(request, response){

        const id = request.params._id;
        try{
            const provider = await Provider.findById(id);

            if(provider != null || provider != undefined) {
                response.status(200).json(provider);
            }
            else {
               response.status(204).json({
                    message: "No data"
                });
            }
        }
        catch (error) {
            response.status(404).json({
                message: error.message
            });
        }
    }

    // Delete a provider
    static async deleteProvider(request, response){

        const id = request.params._id;
        try{
            const result = await Provider.findByIdAndDelete(id);
            response.status(200).json({
                message: "Provider deleted"
            });
        }
        catch (error) {
            response.status(404).json({
                message: error.message
            });
        }
    }

    // Update a provider
    static async updateProvider(request, response){

        const id = request.params._id;
        const willUpdateProvider = request.body;
        try{
            const updatedProvider = await Provider.findByIdAndUpdate(id, willUpdateProvider);
            if(updatedProvider != null || updatedProvider != undefined){
                response.status(200).json({
                    message: `${updatedProvider.name} updated`
                });
            }
            else {
                response.status(200).json({
                    message: "Provider not updated"
                });
            }
        }catch (error){
            response.status(404).json({
                message: error.message
            });
        }
    }

    // static async updateClientWhenDeleteProvider(){

    //     const clients = JSON.stringify(await Client.find());
    //     const providers = JSON.stringify(await Provider.find());

    //     const jsonClients = JSON.parse(clients);
    //     const jsonProviders = JSON.parse(providers);

    //     for (let i = 0; i < jsonClients.length; i++) {
    //         for (let j = 0; j < jsonClients[i].providers.length; j++) {
    //             for (let k = 0; k < jsonProviders.length; k++) {
    //                 if(jsonClients[i].providers[j] == jsonProviders[k]._id){
    //                     const providerValues = Object.values(jsonClients[i].providers);
    //                     const index = providerValues.indexOf(jsonClients[i].providers[j]);
    //                     if(index > -1 ){
    //                         providerValues.splice(index, 1);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}