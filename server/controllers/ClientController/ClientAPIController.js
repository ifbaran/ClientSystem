
const Client = require('../../models/clients');
module.exports = class ClientAPIController {

    static async createClient(request, response){
        const client = request.body;
        try{
            await Client.create(client);
            response.status(200).json({
                message: 'Created'
            });
        }
        catch (error){
            response.status(404).json({ message: error.message});
        }
    }

    static async getAllClients(request, response){

        try{
            const clients = await Client.find().populate('providers');
            if(clients != null || clients != undefined){
                response.status(200).json(clients);
            }
            else {
                response.status(200).json({
                    message: "No data"
                });
            }
        } catch (error) {
            response.status(404).json({
                message: error.message
            });
        } 
    }

    static async getClientById(request, response){

        const id = request.params._id;
        try{
            const client = await Client.findById(id).populate('providers');
            // await client.populate('providers').execPopulate();
            console.log(client);
                // response.status(200).json(client);
        }
        catch (error) {
            response.status(404).json({
                message: error.message
            });
        }
    }

    static async deleteClient(request, response){
        
        const id = request.params._id;
        try {
            const client = await Client.findByIdAndDelete(id);
            response.status(200).json({
                message: `${client.clientName} named client deleted`
            });
        } catch (error) {
            response.status(404).json({
                message: error.message
            });
        }
    }

    static async updateClient(request, response){

        const id = request.params._id;
        const willUpdateClient = request.body;
        try{
            const updatedClient = await Client.findByIdAndUpdate(id, willUpdateClient);
            if(updatedClient != null || updatedClient != undefined){
                response.status(200).json({
                    message: `${willUpdateClient.clientName} updated`
                });
            }
            else {
                response.status(200).json({
                    message: "Client not updated"
                });
            }
        }catch (error){
            response.status(404).json({
                message: error.message
            });
        }
    }
}